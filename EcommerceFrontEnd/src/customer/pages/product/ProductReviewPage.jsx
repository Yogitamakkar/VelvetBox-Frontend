import ReviewCard from "../../components/review/ReviewCard";
import React, { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Rating,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  LinearProgress,
  IconButton,
  Divider,
  Stack,
  Container
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  Flag as FlagIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';


const ProductReviewPage = () => {

  const reviewStats = {
    averageRating: 4.8,
    totalReviews: 2847,
    distribution: [
      { stars: 5, count: 1824, percentage: 64 },
      { stars: 4, count: 710, percentage: 25 },
      { stars: 3, count: 227, percentage: 8 },
      { stars: 2, count: 57, percentage: 2 },
      { stars: 1, count: 29, percentage: 1 }
    ]
  };

  const allReviews = [
    {
      id: 1, userName: "Sarah M.", avatar: "SM", rating: 5, date: "2 days ago", verified: true,
      title: "Exceptional Audio Quality!", 
      content: "These headphones exceeded my expectations. The noise cancellation is phenomenal, and the battery life is exactly as advertised. I use them daily for work calls and music, and they're incredibly comfortable even after hours of use.",
      helpful: 45, images: ['headphone1.jpg'], replies: 3
    },
    {
      id: 2, userName: "Mike D.", avatar: "MD", rating: 5, date: "1 week ago", verified: true,
      title: "Worth every penny", 
      content: "I've been using these for music production and they're incredible. The frequency response is flat and accurate, which is exactly what I need for mixing. The noise isolation helps me focus.",
      helpful: 32, images: [], replies: 1
    },
    {
      id: 3, userName: "Emily R.", avatar: "ER", rating: 4, date: "2 weeks ago", verified: true,
      title: "Great but could be better", 
      content: "Overall very satisfied with the purchase. Sound quality is excellent and noise cancellation works well. My only complaint is that the headband could be a bit more padded for extended wear.",
      helpful: 28, images: [], replies: 0
    },
    {
      id: 4, userName: "James K.", avatar: "JK", rating: 5, date: "3 weeks ago", verified: true,
      title: "Perfect for travel", 
      content: "These have been a game-changer for my frequent flights. The noise cancellation makes airplane noise disappear completely. Battery life easily lasts my longest flights.",
      helpful: 22, images: ['travel.jpg'], replies: 2
    },
    {
      id: 5, userName: "Lisa P.", avatar: "LP", rating: 3, date: "1 month ago", verified: false,
      title: "Good but not great", 
      content: "They sound good and the build quality seems solid, but I expected more from the noise cancellation given the price point. They're comfortable and look nice.",
      helpful: 15, images: [], replies: 5
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Customer Reviews
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Premium Wireless Noise-Cancelling Headphones
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              px: 3,
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            Write Review
          </Button>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={4}>
          {/* Average Rating */}
          <Grid item xs={12} md={4}>
            <Box textAlign={{ xs: 'center', md: 'left' }}>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={2} mb={2}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {reviewStats.averageRating}
                </Typography>
                <Box>
                  <Rating value={reviewStats.averageRating} readOnly size="large" />
                  <Typography variant="body2" color="text.secondary">
                    {reviewStats.totalReviews.toLocaleString()} reviews
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                96% of customers recommend this product
              </Typography>
            </Box>
          </Grid>

          {/* Rating Distribution */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              {reviewStats.distribution.map((item) => (
                <Box key={item.stars} display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2" sx={{ minWidth: 20 }}>
                    {item.stars}★
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Most Helpful Reviews
      </Typography>
      
      <Box mb={4}>
        {allReviews.map((review) => (
          <ReviewCard
            key={`full-${review.id}`}
            review={review}
            showAvatar={true}
            showVerified={true}
            showDate={true}
            showHelpful={true}
            showReply={true}
            showFlag={true}
            showImages={true}
            showMoreMenu={true}
            compact={false}
          />
        ))}
      </Box>

      {/* Load More */}
      <Box textAlign="center" my={4}>
        <Button 
          variant="outlined" 
          size="large"
          sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
        >
          Load More Reviews
        </Button>
      </Box>

      <Paper 
        sx={{ 
          p: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Share Your Experience
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Help other customers make informed decisions by sharing your honest review of this product.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            px: 4,
            py: 2,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }}
        >
          Write Your Review
        </Button>
      </Paper>
    </Container>
  );
};

export default ProductReviewPage;
