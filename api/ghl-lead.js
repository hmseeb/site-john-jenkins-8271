/* =========================================================
   Pro Merchant Savings — GoHighLevel lead intake
   ---------------------------------------------------------
   Receives a submission from any contact / quote form on the
   site and creates or updates the contact inside the GoHighLevel
   sub-account (location MD8tHnfr4XTmcDJIzqbk):

     - first name, last name, phone, email and the message
     - custom field "Lead Source"   -> "Website"
     - custom field "Website Form"  -> the name of the form
     - tag "website-lead"

   Credentials are read from the deployment environment, never
   from the client:

     GHL_API_KEY       Private Integration / OAuth access token
                       for the sub-account (v2 API).  Aliases:
                       GHL_ACCESS_TOKEN, GOHIGHLEVEL_API_KEY.
     GHL_LOCATION_ID   Optional override of the location id.
     GHL_WEBHOOK_URL   Optional GoHighLevel inbound webhook used
                       as a fallback when no API token is set.
   ========================================================= */

'use strict';

var LOCATION_ID = process.env.GHL_LOCATION_ID || 'MD8tHnfr4XTmcDJIzqbk';
var API_BASE = 'https://services.leadconnectorhq.com';
var API_VERSION = '2021-07-28';
var TAG = 'website-lead';
var LEAD_SOURCE = 'Website';

function token() {
  return (
    process.env.GHL_API_KEY ||
    process.env.GHL_ACCESS_TOKEN ||
    process.env.GOHIGHLEVEL_API_KEY ||
    ''
  ).trim();
}

function clean(value, max) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, max || 2000);
}

function splitName(full, firstIn, lastIn) {
  var first = clean(firstIn, 80);
  var last = clean(lastIn, 80);
  if (first || last) return { first: first, last: last };

  var parts = clean(full, 160).split(/\s+/).filter(Boolean);
  if (!parts.length) return { first: '', last: '' };
  if (parts.length === 1) return { first: parts[0], last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

/* GoHighLevel prefers E.164. US/CA numbers get a +1 prefix. */
function normalisePhone(raw) {
  var value = clean(raw, 40);
  if (!value) return '';
  if (/^\+/.test(value)) return '+' + value.slice(1).replace(/\D/g, '');
  var digits = value.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.charAt(0) === '1') return '+' + digits;
  return '+' + digits;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
}

function headers() {
  return {
    Authorization: 'Bearer ' + token(),
    Version: API_VERSION,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}

/* Build the readable message body stored on the contact + note. */
function buildMessage(data) {
  var rows = [
    ['Form', data.formName],
    ['Name', data.name],
    ['Business', data.business],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Type of business', data.industry],
    ['Monthly card volume', data.volume],
    ['Current processor', data.processor],
    ['Best time to reach', data.preferred],
    ['Text consent', data.consent ? 'Yes' : 'No'],
    ['Page', data.pageUrl]
  ].filter(function (row) {
    return row[1];
  });

  var lines = rows.map(function (row) {
    return row[0] + ': ' + row[1];
  });

  lines.push('');
  lines.push('Message:');
  lines.push(data.message || 'No additional details provided.');
  return lines.join('\n');
}

/* Look up the location's contact custom fields so we can target
   "Lead Source" and "Website Form" by id rather than guessing keys. */
async function loadCustomFields() {
  try {
    var res = await fetch(
      API_BASE + '/locations/' + encodeURIComponent(LOCATION_ID) + '/customFields?model=contact',
      { method: 'GET', headers: headers() }
    );
    if (!res.ok) return [];
    var json = await res.json();
    return json.customFields || json.customField || [];
  } catch (err) {
    return [];
  }
}

function matchField(fields, name, keys) {
  var wanted = name.toLowerCase();
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var fieldName = String(field.name || '').toLowerCase();
    var fieldKey = String(field.fieldKey || field.key || '').toLowerCase();
    if (fieldName === wanted) return field;
    for (var k = 0; k < keys.length; k++) {
      if (fieldKey === keys[k] || fieldKey === 'contact.' + keys[k]) return field;
    }
  }
  return null;
}

function customFieldEntries(fields, values) {
  var entries = [];
  values.forEach(function (item) {
    var found = matchField(fields, item.name, item.keys);
    if (found && found.id) {
      entries.push({ id: found.id, field_value: item.value });
    } else {
      // Fall back to the conventional key so the value still lands
      // if the field exists but was not returned by the lookup.
      entries.push({ key: item.keys[0], field_value: item.value });
    }
  });
  return entries;
}

async function upsertContact(body) {
  var res = await fetch(API_BASE + '/contacts/upsert', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body)
  });
  var text = await res.text();
  var json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch (err) {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json: json };
}

async function addNote(contactId, message) {
  if (!contactId) return;
  try {
    await fetch(API_BASE + '/contacts/' + encodeURIComponent(contactId) + '/notes', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ body: message })
    });
  } catch (err) {
    /* A missing note must never fail the submission. */
  }
}

async function sendToWebhook(data, message) {
  var url = (process.env.GHL_WEBHOOK_URL || '').trim();
  if (!url) return false;
  try {
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationId: LOCATION_ID,
        first_name: data.firstName,
        last_name: data.lastName,
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        message: message,
        lead_source: LEAD_SOURCE,
        website_form: data.formName,
        tags: [TAG]
      })
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

function readBody(req) {
  var body = req.body;
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (err) {
      return {};
    }
  }
  return body;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  var input = readBody(req);

  // Honeypot — pretend everything is fine, store nothing.
  if (clean(input['company-website'] || input.companyWebsite, 200)) {
    return res.status(200).json({ ok: true, delivered: false });
  }

  var names = splitName(input.name, input.firstName, input.lastName);
  var email = clean(input.email, 160);
  var phone = normalisePhone(input.phone);

  if (!names.first && !email && !phone) {
    return res.status(400).json({ ok: false, error: 'A name, email or phone number is required.' });
  }
  if (email && !isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  var data = {
    formName: clean(input.formName, 120) || 'Website Form',
    name: clean(input.name, 160) || [names.first, names.last].filter(Boolean).join(' '),
    firstName: names.first,
    lastName: names.last,
    email: email,
    phone: phone,
    business: clean(input.business, 160),
    industry: clean(input.industry, 120),
    volume: clean(input.volume, 120),
    processor: clean(input.processor, 160),
    preferred: clean(input.preferred, 120),
    consent: input.consent === true || input.consent === 'yes' || input.consent === 'on',
    message: clean(input.message, 5000),
    pageUrl: clean(input.pageUrl, 300)
  };

  var message = buildMessage(data);

  if (!token()) {
    var viaWebhook = await sendToWebhook(data, message);
    if (viaWebhook) return res.status(200).json({ ok: true, delivered: true });

    // Nothing configured yet: log the lead so it is never lost and
    // still confirm receipt to the visitor.
    console.warn('[ghl-lead] GHL_API_KEY is not configured — lead logged only:\n' + message);
    return res.status(200).json({ ok: true, delivered: false });
  }

  try {
    var fields = await loadCustomFields();
    var customFields = customFieldEntries(fields, [
      { name: 'Lead Source', keys: ['lead_source', 'leadsource'], value: LEAD_SOURCE },
      { name: 'Website Form', keys: ['website_form', 'websiteform'], value: data.formName }
    ]);

    var messageField = matchField(fields, 'Message', ['message']);
    if (messageField && messageField.id) {
      customFields.push({ id: messageField.id, field_value: data.message || message });
    }

    var payload = {
      locationId: LOCATION_ID,
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.name,
      tags: [TAG],
      source: LEAD_SOURCE,
      customFields: customFields
    };
    if (data.email) payload.email = data.email;
    if (data.phone) payload.phone = data.phone;
    if (data.business) payload.companyName = data.business;

    var result = await upsertContact(payload);

    // If a custom field is missing in the sub-account the upsert can be
    // rejected — retry without them so the contact and tag still land.
    if (!result.ok && (result.status === 400 || result.status === 422)) {
      delete payload.customFields;
      result = await upsertContact(payload);
    }

    if (!result.ok) {
      console.error('[ghl-lead] GoHighLevel upsert failed', result.status, JSON.stringify(result.json));
      return res.status(502).json({ ok: false, error: 'Could not reach GoHighLevel.' });
    }

    var contact = result.json.contact || result.json;
    await addNote(contact && contact.id, message);

    return res.status(200).json({ ok: true, delivered: true, contactId: (contact && contact.id) || null });
  } catch (err) {
    console.error('[ghl-lead] Unexpected error', err && err.message);
    return res.status(502).json({ ok: false, error: 'Could not reach GoHighLevel.' });
  }
};
