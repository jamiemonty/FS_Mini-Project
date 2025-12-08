async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const response = await fetch('http://localhost:8000/getUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const users = await response.json();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
