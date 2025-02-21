function saveTest(testId, score) {
	fetch('/save-test', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ test_id: testId, score: score })
	})
	.then(response => {
	  if (response.status === 401) {
		window.location.href = '/login';
		return;
	  }
	  return response.json();
	})
	.then(data => {
	  if (data && data.success) {
		window.location.href = '/dashboard';
		return;
	  } else if (data) {
		console.error('Failed to record activity:', data.message);
	  }
	})
	.catch(error => {
	  console.error('Error sending save-test request:', error);
	});
}