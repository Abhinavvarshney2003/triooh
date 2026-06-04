const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const CAMPAIGNS_FILE = path.join(__dirname, 'campaigns.json');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// POST API Endpoint to handle brand campaign briefs
app.post('/api/proposal', (req, res) => {
  try {
    const { name, email, brand, budget, brief } = req.body;

    // Server-side validation
    if (!name || !email || !brand || !budget || !brief) {
      return res.status(400).json({
        success: false,
        message: 'All proposal parameters (name, email, brand, budget, brief) are required.'
      });
    }

    // Prepare structured campaign brief payload
    const newProposal = {
      id: 'prop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11),
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      brand: brand.trim(),
      budget: budget.trim(),
      brief: brief.trim()
    };

    // Lightweight file-based persistent storage
    let campaigns = [];
    if (fs.existsSync(CAMPAIGNS_FILE)) {
      try {
        const fileContent = fs.readFileSync(CAMPAIGNS_FILE, 'utf8');
        campaigns = JSON.parse(fileContent || '[]');
      } catch (err) {
        console.error('Error reading/parsing campaigns.json database, resetting local array:', err);
        campaigns = [];
      }
    }

    // Insert new proposal at the beginning of list
    campaigns.unshift(newProposal);

    // Write synchronized list back to file
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2), 'utf8');

    console.log(`[Database Server] Saved new campaign brief brief from "${newProposal.name}" (${newProposal.brand})`);

    return res.status(200).json({
      success: true,
      message: 'Brief submitted successfully! Our expert planners will connect with you soon.',
      data: newProposal
    });

  } catch (error) {
    console.error('Unhandled internal server error during proposal creation:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while processing your proposal. Please try again.'
    });
  }
});

// Serve index.html as a fallback for all SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Launch server listener
app.listen(PORT, () => {
  console.log('============================================================');
  console.log(`🚀 TRIOOH Express Backend launched successfully!`);
  console.log(`   - Local Server: http://localhost:${PORT}`);
  console.log(`   - Database Log: ${CAMPAIGNS_FILE}`);
  console.log('============================================================');
});
