const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContactById = contacts.find((contact) => contact.id === contactId);
  return findContactById || null;
  }
async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexContact === -1) {
    return null;
  }

  const removedContact = contacts.splice(indexContact, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
 }

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
