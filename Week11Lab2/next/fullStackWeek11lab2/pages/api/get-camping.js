async function handler(req, res) {
  const response = await fetch('http://localhost:8000/getCampingSites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  res.json(data);
}

export default handler;
