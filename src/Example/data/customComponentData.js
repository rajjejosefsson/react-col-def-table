import React from "react";

export const customComponentColDef = [
  {
    key: "checkbox",
    size: 50
  },
  {
    label: "Id",
    key: "id",
    size: 50
  },
  {
    label: "Hotel",
    key: "hotel",
    size: 250,
    component: ({ rowData }) => {
      return <a href={rowData.link}>{rowData.hotel}</a>;
    }
  },
  {
    label: "City",
    key: "city",
    size: 100
  },
  {
    label: "Country",
    key: "country",
    size: 100
  },
  {
    label: "Contact",
    key: "contact",
    size: 130
  }
];

export const customComponentData = [
  {
    id: 1,
    hotel: "Bella Stay",
    city: "Milano",
    country: "Italy",
    contact: "Rasmus",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 2,
    hotel: "Pi",
    city: "New York",
    country: "USA",
    contact: "Lucas",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 3,
    hotel: "Sadie In",
    age: 10,
    city: "New York",
    country: "USA",
    contact: "Ariadna",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 4,
    hotel: "Dalaros Stay",
    city: "Paris",
    country: "France",
    contact: "Philipe",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 5,
    hotel: "Lucy",
    city: "Mallorca",
    country: "Spain",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 6,
    hotel: "Luna",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 7,
    hotel: "Scandia",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    lastName: "Botticelli",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 8,
    hotel: "Extended Stay America - Midtown",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 9,
    hotel: "Bellagio Las Vegas",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 10,
    hotel: "Accor",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 11,
    hotel: "Caesars Palace",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 12,
    hotel: "MGM Grand",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  },
  {
    id: 13,
    hotel: "Grand Placa",
    city: "New York",
    country: "USA",
    contact: "Andrea",
    link: "https://rasmusjosefsson.com"
  }
];
