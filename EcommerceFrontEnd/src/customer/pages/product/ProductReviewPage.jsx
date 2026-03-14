import ReviewCard from "../../components/review/ReviewCard";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { reviewApi, mapReview } from '../../../api/api';

import {
  Box,
  Typography,
  Button,
  Rating,
  LinearProgress,
  Stack,
  Container,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const ProductReviewPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    setLoading(true);

    reviewApi.getByProduct(productId)
      .then((data) => {
        if (cancelled) return;
        setReviews(Array.isArray(data) ? data.map(mapReview) : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [productId]);

  // Compute stats from actual reviews
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => Math.round(r.rating) === stars).length;
    return { stars, count, percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#e8006f' }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Customer Reviews
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              px: 3, py: 1.5, fontWeight: 'bold'
            }}
          >
            Write Review
          </Button>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign={{ xs: 'center', md: 'left' }}>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={2} mb={2}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {averageRating}
                </Typography>
                <Box>
                  <Rating value={Number(averageRating)} readOnly size="large" />
                  <Typography variant="body2" color="text.secondary">
                    {totalReviews.toLocaleString()} reviews
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              {distribution.map((item) => (
                <Box key={item.stars} display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2" sx={{ minWidth: 20 }}>
                    {item.stars}{'\u2605'}
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
      {reviews.length > 0 ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            All Reviews
          </Typography>
          <Box mb={4}>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
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
        </>
      ) : (
        <Typography sx={{ textAlign: 'center', py: 6, color: 'gray' }}>
          No reviews yet. Be the first to write one!
        </Typography>
      )}

      <Paper
        sx={{
          p: 6, textAlign: 'center',
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
            bgcolor: 'white', color: 'primary.main',
            px: 4, py: 2, fontWeight: 'bold',
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          Write Your Review
        </Button>
      </Paper>
    </Container>
  );
};

export default ProductReviewPage;
