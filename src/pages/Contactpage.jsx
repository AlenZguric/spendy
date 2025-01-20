import React, { useState } from 'react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika za slanje poruke (npr. Firebase funkcija)
    console.log({ name, email, message });
    alert('Poruka je uspješno poslana!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h2>Kontaktirajte nas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vaše ime"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Vaš email"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Vaša poruka"
          required
        />
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
};

export default ContactPage;
