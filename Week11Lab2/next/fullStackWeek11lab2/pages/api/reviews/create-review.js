async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:8000/createReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      return res.status(500).json({ response: 'fail', error: 'Backend server error' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ response: 'fail', error: error.message });
  }
}

export default handler;
