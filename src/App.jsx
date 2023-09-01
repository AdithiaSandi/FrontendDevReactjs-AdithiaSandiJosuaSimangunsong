import "./App.css";
import { useState, useEffect } from "react";
import types from "./data/types";
import prices from "./data/prices";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Cards from "./components/Cards";
import Details from "./components/Details";

function App() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState();
  const [detailId, setDetailId] = useState("");
  // console.log(detail);
  // console.log(data);
  const [shown, setShown] = useState({ count: 8, items: [] });
  const [filter, setFilter] = useState({
    price: "",
    category: "",
    showOpen: false,
  });

  const handleToggleOpen = () => {
    setFilter((prev) => {
      setShown(() => ({
        count: 8,
        items: !prev.showOpen
          ? data.filter((item) => item.open === true)
          : data,
      }));
      return { ...prev, showOpen: !prev.showOpen };
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "Price") {
      setFilter((prev) => ({ ...prev, price: event.target.value }));
      setShown((prev) => ({
        ...prev,
        count: 8,
      }));
    } else {
      setFilter((prev) => ({ ...prev, category: event.target.value }));
      setShown((prev) => ({
        ...prev,
        count: 8,
      }));
    }
  };

  const handleResetFilter = (event) => {
    event.preventDefault();
    setFilter({ price: "", category: "", showOpen: false });
  };

  const handleMore = () => {
    setShown((prev) => ({ ...prev, count: prev.count + 4 }));
  };

  const toggleDetail = (event) => {
    console.log(data.find((item) => item.id === event.target.id));
    if (detailId === "") {
      setDetailId(event.target.id);
      fetch(`https://restaurant-api.dicoding.dev/detail/${event.target.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => setDetail(response.restaurant))
        .catch((err) => console.error(err));
    } else setDetailId("");
  };

  useEffect(() => {
    const options = { method: "GET" };

    data.length === 0
      ? fetch("https://restaurant-api.dicoding.dev/list", options)
          .then((response) => response.json())
          .then((response) => {
            const open = [false, true];
            const temp = response.restaurants.map((item) => {
              return {
                ...item,
                type: types[Math.floor(Math.random() * types.length)],
                price: prices[Math.floor(Math.random() * prices.length)],
                open: open[Math.floor(Math.random() * open.length)],
              };
            });
            setData(temp);
          })
          .catch((err) => console.error(err))
      : setShown((prev) => ({ ...prev, items: data }));
  }, [data]);

  return (
    <>
      <header
        style={{ borderBottom: "1px solid rgba(0,0,0, 0.1)", padding: "0 5vw" }}
      >
        <span className="title" style={{ fontSize: "clamp(3rem, 10rem, 5vw)" }}>
          Restaurants
        </span>
        <p
          className="title-desc"
          style={{ color: "rgba(0,0,0, 0.5)", maxWidth: "40vw" }}
        >
          Do duis eu ad laboris sunt dolor dolore cupidatat tempor labore aliqua
          cupidatat ullamco nisi. Laborum non ea laborum eu qui duis ut laboris
          nostrud quis veniam excepteur proident qui.
        </p>
      </header>

      <div className="content-container">
        <div
          className="filter-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: "2vh 5vw",
            borderBottom: "1px solid rgba(0,0,0, 0.1)",
          }}
        >
          {/* DIALS */}
          <div
            className="filters"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "end",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "20px", color: "gray" }}>Filter By:</span>

            <FormGroup
              sx={{
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)",
                marginLeft: "8px",
                marginRight: "8px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ paddingBottom: 0, paddingTop: 0 }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    size="small"
                    checked={filter.showOpen}
                    onChange={handleToggleOpen}
                  />
                }
                label="Open Now"
                sx={{ marginRight: 0, marginTop: "16px" }}
              />
            </FormGroup>

            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                marginTop: 0,
                marginBottom: 0,
                "& .MuiInputBase-root::before": {
                  borderColor: "rgba(0,0,0,0.2)",
                },
              }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "black" }}
              >
                <>Price</>
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="Price"
                value={filter.price}
                onChange={handleChange}
                label="Price"
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  marginTop: 0,
                  borderColor: "rgba(0,0,0, 0.2)",
                  "& .MuiSelect-select": {
                    paddingBottom: 0,
                  },
                }}
              >
                <MenuItem value="">
                  <em>-- Clear --</em>
                </MenuItem>
                <MenuItem value={"ascending"}>Ascending</MenuItem>
                <MenuItem value={"descending"}>Descending</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                marginTop: 0,
                marginBottom: 0,
                "& .MuiInputBase-root::before": {
                  borderColor: "rgba(0,0,0,0.2)",
                },
              }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "black" }}
              >
                <>Categories</>
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="Categories"
                value={filter.category}
                onChange={handleChange}
                label="Categories"
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  marginTop: 0,
                  "& .MuiSelect-select": {
                    paddingBottom: 0,
                  },
                }}
              >
                <MenuItem value="">
                  <em>-- Clear --</em>
                </MenuItem>
                {types.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          {/* CLEAR BUTTON */}
          <Button
            variant="outlined"
            color="secondary"
            disabled={
              filter.price === "" &&
              filter.category === "" &&
              filter.showOpen === false
            }
            onClick={handleResetFilter}
            sx={{
              borderRadius: "3px",
              paddingRight: "2rem",
              paddingLeft: "2rem",
            }}
          >
            CLEAR ALL
          </Button>
        </div>

        {detailId === "" ? (
          <>
            {/* ITEMS */}
            <div style={{ padding: "5vw" }}>
              <span
                style={{
                  fontSize: "clamp(2rem, 5rem, 1vw)",
                  fontWeight: "300",
                }}
              >
                All Restaurants
              </span>
            </div>

            <div
              className="items-container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: "2vw 5vw",
              }}
            >
              {filter.price === "ascending"
                ? [...shown.items]
                    .sort((a, b) => a.price.length - b.price.length)
                    .filter((item) => item.type.includes(filter.category))
                    .map((item, index) => {
                      return index < shown.count ? (
                        <Cards data={item} toggleDetail={toggleDetail} />
                      ) : null;
                    })
                : filter.price === "descending"
                ? [...shown.items]
                    .sort((a, b) => b.price.length - a.price.length)
                    .filter((item) => item.type.includes(filter.category))
                    .map((item, index) => {
                      return index < shown.count ? (
                        <Cards data={item} toggleDetail={toggleDetail} />
                      ) : null;
                    })
                : shown.items
                    .filter((item) => item.type.includes(filter.category))
                    .map((item, index) => {
                      return index < shown.count ? (
                        <Cards data={item} toggleDetail={toggleDetail} />
                      ) : null;
                    })}
            </div>

            <div
              className="btn-container"
              style={{ padding: "1vw 5vw", textAlign: "center" }}
              hidden={shown.count >= shown.items.length}
            >
              <Button
                style={{
                  outline: "#002B56 solid 1px",
                  color: "#002B56",
                  borderRadius: "3px",
                  width: "50vw",
                }}
                onClick={handleMore}
              >
                Load More
              </Button>
            </div>
          </>
        ) : (
          <Details
            toggleDetail={toggleDetail}
            data={data.find((item) => item.id === detailId)}
            detail={detail}
          />
        )}
      </div>
    </>
  );
}

export default App;
