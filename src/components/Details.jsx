/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Box, IconButton, Typography, Tooltip, Rating } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

const Details = ({ data, toggleDetail, detail }) => {
  return (
    <div style={{ padding: "1vw 5vw" }}>
      <IconButton onClick={toggleDetail}>
        <WestIcon />
      </IconButton>
      <div
        className="details-container"
        style={{ display: "flex", flexWrap: "wrap", padding: 5 }}
      >
        <Box sx={{
            marginRight: "5vw"
        }}>
          <Typography gutterBottom variant="h3" component="div">
            {data.name}
          </Typography>
          <Tooltip
            title={data.rating + " / 5.0"}
            placement="right"
            sx={{ display: "table-caption" }}
          >
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
          <img
            src={
              `https://restaurant-api.dicoding.dev/images/small/` +
              data.pictureId
            }
            alt=""
            style={{
                maxWidth: "80vw"
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            maxWidth: "20vw",
            maxHeight: "40vh",
            overflow: "auto"
          }}
        >
          {detail.customerReviews.map((item) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontWeight: "600" }}>{item.name}</p>
                <section>{item.review}</section>
                <span style={{fontSize: 13, color: "gray"}}>{item.date}</span>
              </div>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default Details;
