import { Typography, styled, Container, Stack } from '@mui/material';

const BackgroundImage = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 65;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url(https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 65;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.6);
  }
`;

const CenteredBox = styled(Stack)`
  text-align: center;
  position: relative;
  padding: 2rem;
  gap: ${({ theme }) => theme.spacing(2)};
  color: #121212;
`;

const About = () => {
  return (
    <BackgroundImage>
      <Container>
        <CenteredBox>
          <section>
            <Typography fontWeight="bold" variant="h5">
              About us
            </Typography>
            <Typography variant="body1">
              We like to call our store "The home of ethical & natural beauty" -
              a place where the most luxurious clean beauty brands stand under
              the same roof
            </Typography>
          </section>
          <section>
            <Typography fontWeight="bold" variant="h5">
              Why natural?
            </Typography>
            <Typography variant="body1">
              Up to 64 % of the stuff we put on our skin absorb in to our body
              and affect to our well-being, so it’s not insignificant which
              products you’re using. By using top quality organic cosmetics, you
              efficiently decrease the chemical burden of your body. The
              products of our selection include the best organic ingredients and
              all the products are extremely nurturant and the brands are
              certified.
            </Typography>
          </section>
          <section>
            <Typography fontWeight="bold" variant="h5">
              Green thinking
            </Typography>
            <Typography variant="body1">
              We follow the principles of a green office and avoid any excess
              paper waste. We use 100% recycled cardboard & paper in our
              packaging. To avoid excess carbon emissions, we order the products
              in larger batches.
            </Typography>
            <Typography>
              Welcome to the luxurious world of natural cosmetics! 🌿
            </Typography>
          </section>
        </CenteredBox>
      </Container>
    </BackgroundImage>
  );
};

export default About;
