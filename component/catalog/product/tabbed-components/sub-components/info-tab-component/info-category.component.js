import React,{useEffect, useState} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const categoryData = [
  {
    id: 1,
    name: "Vitamins & Supplements",
    select_all: false,
    sub: [
      {
        id: 5,
        name: "Mens Multivitamins",
        select: false,
      },
      {
        id: 6,
        name: "Womens Multivitamins",
        select: false,
      },
      {
        id: 7,
        name: "Mens 50+ Vitamins",
        select: false,
      },
      {
        id: 8,
        name: "Womens 50+ Vitamins",
        select: false,
      },
      {
        id: 9,
        name: "Teenagers Vitamins",
        select: false,
      },
      {
        id: 11,
        name: "Kids Vitamins",
        select: false,
      },
      {
        id: 12,
        name: "Sports Vitamins",
        select: false,
      },
    ],
  },
  {
    id: 2,
    name: "Proteins & Sports Nutrition",
    select_all: false,
    sub: [
      {
        id: 61,
        name: "Whey Protein",
        select: false,
      },
      {
        id: 34,
        name: "Whey Protein Isolate",
        select: false,
      },
      {
        id: 33,
        name: "Protein Blend",
        select: false,
      },
      {
        id: 27,
        name: "Weight Gainer",
        select: false,
      },
      {
        id: 26,
        name: "Lean Protein",
        select: false,
      },
      {
        id: 30,
        name: "Casein Protein",
        select: false,
      },
      {
        id: 28,
        name: "Vegan Protein",
        select: false,
      },
    ],
  },
  {
    id: 3,
    name: "Wellnes",
    select_all: false,
    sub: [
      {
        id: 31,
        name: "Plant Protein",
        select: false,
      },
      {
        id: 55,
        name: "Egg Protein",
        select: false,
      },
      {
        id: 56,
        name: "Collagen Protein",
        select: false,
      },
      {
        id: 29,
        name: "Natural And Other Protein",
        select: false,
      },
      {
        id: 50,
        name: "Hydration",
        select: false,
      },
      {
        id: 57,
        name: "Electrolytes / Gels",
        select: false,
      },
      {
        id: 58,
        name: "Pre Workout",
        select: false,
      },
      {
        id: 59,
        name: "Intra Workout",
        select: false,
      },
      {
        id: 60,
        name: "Post Workout",
        select: false,
      },
      {
        id: 54,
        name: "Isotonic Sports Drinks",
        select: false,
      },
      {
        id: 53,
        name: "Weight Loss / Fat Burners",
        select: false,
      },
      {
        id: 32,
        name: "Recovery Drinks",
        select: false,
      },
      {
        id: 52,
        name: "BCAA",
        select: false,
      },
      {
        id: 51,
        name: "Creatine",
        select: false,
      },
    ],
  },
  {
    id: 4,
    name: "Food & Drinks",
    select_all: false,
    sub: [
      {
        id: 14,
        name: "Joint Support",
        select: false,
      },
      {
        id: 78,
        name: "Vitamin D3",
        select: false,
      },
      {
        id: 13,
        name: "Omegas And Fish Oils",
        select: false,
      },
      {
        id: 49,
        name: "Collagen",
        select: false,
      },
      {
        id: 15,
        name: "Vegan Omega",
        select: false,
      },
      {
        id: 16,
        name: "Calcium",
        select: false,
      },
      {
        id: 17,
        name: "Hair, Skin And Nails Vitamins",
        select: false,
      },
      {
        id: 18,
        name: "Eye Health",
        select: false,
      },
      {
        id: 19,
        name: "Immune Health",
        select: false,
      },
      {
        id: 20,
        name: "Digestive Gut Health",
        select: false,
      },
      {
        id: 21,
        name: "Brain And Memory",
        select: false,
      },
      {
        id: 22,
        name: "Thyroid Health",
        select: false,
      },
      {
        id: 23,
        name: "Liver Health",
        select: false,
      },
    ],
  },
];

export default function InfoCategoryComponent() {
  const [category, setCategory] = useState([]);

  const handleChangeAll = (event) => {
    
  };

  const handleChange = (event) => {
    // let cat = category;

  };

  useEffect(() => {
    setCategory(categoryData)
  }, [])
  


  return (
    <div>
      {category?.map((val) => {
        return (
          <div className="cat-check">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#012169" }}
                    size="small"
                    // checked={val?.select_all}
                    // onChange={handleChangeAll}
                  />
                }
                label={val?.name}
              />
            </FormGroup>
            <div className="row margin-check">
              {val?.sub?.map((p) => {
                return (
                  <div className="col-md-4">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: "#012169" }}
                            size="small"
                            // checked={p?.select}
                            // onChange={handleChange}
                          />
                        }
                        label={p?.name}
                      />
                    </FormGroup>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
