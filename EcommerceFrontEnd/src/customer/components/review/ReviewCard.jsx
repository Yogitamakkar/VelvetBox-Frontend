
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Rating,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  Flag as FlagIcon,
  MoreVert as MoreVertIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

// Flexible Review Card Component
const ReviewCard = ({
  review,
  showAvatar = true,
  showVerified = true,
  showDate = true,
  showHelpful = true,
  showReply = true,
  showFlag = true,
  showImages = true,
  showMoreMenu = true,
  compact = false
}) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        '&:hover': { 
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            {showAvatar && (
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {review.avatar}
              </Avatar>
            )}
            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {review.userName}
                </Typography>
                {showVerified && review.verified && (
                  <Chip 
                    icon={<VerifiedIcon />}
                    label="Verified Purchase" 
                    size="small" 
                    color="success"
                    variant="outlined"
                  />
                )}
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Rating value={review.rating} readOnly size="small" />
                {showDate && (
                  <Typography variant="caption" color="text.secondary">
                    {review.date}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          {showMoreMenu && (
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {review.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 'none',
            WebkitBoxOrient: 'vertical',
            overflow: compact ? 'hidden' : 'visible'
          }}
        >
          {review.content}
        </Typography>

        {showImages && review.images && review.images.length > 0 && (
          <Box display="flex" gap={1} mb={2}>
            {review.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  IMG
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Actions */}
        {/* <Divider sx={{ my: 2 }} /> */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            {showHelpful && (
              <Button
                startIcon={<ThumbUpIcon />}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                Helpful ({review.helpful})
              </Button>
            )}
            {showReply && review.replies > 0 && (
              <Button
                startIcon={<ReplyIcon />}
                size="small"
                color="primary"
              >
                {review.replies} {review.replies === 1 ? 'Reply' : 'Replies'}
              </Button>
            )}
          </Stack>
          {showFlag && (
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <FlagIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
export default ReviewCard;