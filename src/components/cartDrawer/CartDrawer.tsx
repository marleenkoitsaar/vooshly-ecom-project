import { Drawer, Typography } from '@mui/material';

const CartDrawer = () => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 345,
        },
      }}
      open={false}
      anchor="right"
    >
      <Typography>test</Typography>
    </Drawer>
  );
};

export default CartDrawer;
