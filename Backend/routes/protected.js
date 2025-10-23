const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/protected/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to your dashboard!',
    data: {
      user: req.user,
      dashboardData: {
        totalPosts: 0,
        totalComments: 0,
        lastLogin: req.user.lastLogin,
        accountCreated: req.user.createdAt
      }
    }
  });
});

// @route   GET /api/protected/admin
// @desc    Admin only route
// @access  Private (Admin)
router.get('/admin', authenticateToken, requireAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to admin panel!',
    data: {
      adminUser: req.user,
      adminData: {
        totalUsers: 0,
        systemStatus: 'Online',
        lastMaintenance: new Date()
      }
    }
  });
});

// @route   GET /api/protected/user-stats
// @desc    Get user statistics
// @access  Private
router.get('/user-stats', authenticateToken, async (req, res) => {
  try {
    // This is just an example - you would implement actual statistics
    const stats = {
      profileViews: Math.floor(Math.random() * 1000),
      postsCreated: Math.floor(Math.random() * 50),
      commentsMade: Math.floor(Math.random() * 200),
      accountAge: Math.floor((new Date() - req.user.createdAt) / (1000 * 60 * 60 * 24)) // days
    };

    res.json({
      success: true,
      data: {
        stats,
        user: req.user
      }
    });
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics'
    });
  }
});

// @route   POST /api/protected/upload-avatar
// @desc    Upload user avatar (example)
// @access  Private
router.post('/upload-avatar', authenticateToken, (req, res) => {
  // This is a placeholder for avatar upload
  // In a real application, you would use multer or similar for file uploads
  res.json({
    success: true,
    message: 'Avatar upload endpoint (implement with multer)',
    data: {
      message: 'This endpoint would handle file uploads for user avatars'
    }
  });
});

module.exports = router;