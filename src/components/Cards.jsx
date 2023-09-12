/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const Cards = ({ data, toggleDetail }) => {
  return (
    <Card sx={{ width: 345, marginBottom: 10, boxShadow: 0 }}>
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <CardMedia
          sx={{
            height: 140,
            "&:hover": {
              transform: "scale3d(1.5, 1.5, 1)",
            },
            transition: "transform 1s ease-in-out",
          }}
          image={
            `https://restaurant-api.dicoding.dev/images/small/` + data.pictureId
          }
          title="green iguana"
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Tooltip title={data.rating + " / 5.0"} placement="right">
          <Box display="inline-block">
            <Rating
              name="half-rating-read"
              value={data.rating}
              precision={0.1}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#052049",
                },
              }}
            />
          </Box>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            fontSize: 15,
          }}
        >
          <span
            className="left"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#B8B8B8",
            }}
          >
            {data.type.toUpperCase() + " - " + data.price}
          </span>
          <span
            className="right"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CircleIcon color={data.open ? "success" : "error"} />
            <span style={{ color: "#B8B8B8" }}>
              {data.open ? "Open Now" : "Closed"}
            </span>
          </span>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          id={data.id}
          onClick={toggleDetail}
          variant="contained"
          sx={{ width: "100%", backgroundColor: "#002B56", fontWeight: "400" }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
