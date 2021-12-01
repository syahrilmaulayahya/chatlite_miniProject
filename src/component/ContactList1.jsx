function ContactList1(props) {
  const { contacts } = props;
  return (
    <>
      <div className="list-group-item list-group-item-action border-0">
        <div className="d-flex align-items-start">
          <img
            src={contacts.contact.picture}
            className="rounded-circle mr-1"
            alt={contacts.contact.name}
            width="40"
            height="40"
          />

          <div className="flex-grow-1 ml-3">
            &nbsp;{contacts.contact.name}
            <br />
            &nbsp;{contacts.contact.email}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactList1;
