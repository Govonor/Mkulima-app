// frontend/components/OrderItem.tsx
import React from 'react';
import { OrderItem as OrderItemType } from '../types/order'; // Assuming you have an OrderItem type
import { Card, CardContent, Typography, Grid, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface OrderItemProps {
  item: OrderItemType;
  onRemove?: (itemId: number) => void; // Optional remove handler
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onRemove }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{item.product?.name || 'Product Deleted'}</Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
            <Typography variant="body2">Price: Ksh {item.price}</Typography>
            <Typography variant="body2">Subtotal: Ksh {item.quantity * item.price}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end" alignItems="center">
            {onRemove && (
              <IconButton aria-label="remove item" onClick={() => onRemove(item.id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderItem;