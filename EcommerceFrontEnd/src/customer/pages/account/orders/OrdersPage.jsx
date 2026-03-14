import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import OrderCard from "../../../components/account/order/OrderCard";
import { useNavigate, useParams } from "react-router-dom";
import { orderApi, mapOrder } from "../../../../api/api";

export default function OrdersPage({ activeTab }) {
  const { orderId, orderItemId } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    orderApi.getUserOrders()
      .then((data) => {
        if (cancelled) return;
        const mapped = (Array.isArray(data) ? data : []).map(mapOrder);
        setOrders(mapped);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center py-10">
        <CircularProgress sx={{ color: '#e8006f' }} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-10">
        <Typography color="error">{error}</Typography>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="text-center py-10">
        <Typography color="text.secondary">No orders yet.</Typography>
      </section>
    );
  }

  return (
    <section>
      <div className="space-y-6">
        {orders.map((order, orderIndex) => (
          <OrderCard
            key={order.id}
            order={order}
            orderIndex={orderIndex}
          />
        ))}
      </div>
    </section>
  );
}
