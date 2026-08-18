---
title: css media queries

---

*CSS MEDIA QUERIES*
by gideon gugwong , july 26, 2026

CSS Media Queries CSS media queries allow you to apply styles based on the characteristics of a device or the environment displaying the web page. CSS media queries are essential for creating responsive web pages. The CSS @media rule is used to add media queries to your style sheet.

**SYNTAX**
This is the general structure of media Queries @media [not] media-type and (media-feature: value) and (media-feature: value) { /* CSS rules to apply */ }

for example; /*@media screen and (max-width: 768px) { body { background-color: lightblue; } }*****/
**CSS MEDIA QUERIES TYPE**
The optional media type specifies the type of media the styles are for.
all; Used for all media type devices
print; Used for print preview mode
screen; Used for computer screens, tablets, and smart-phones

**COMMON USES**
Responsive Layouts: Adjusting grids, flexbox, or margins for mobile vs. Typography: Scaling font sizes for readability on smaller screens. Navigation: Switching from horizontal menus to hamburger menus. Images: Serving different image sizes depending on resolution.
Media queries are the backbone of responsive design. They empower developers to create fluid, user-friendly experiences across phones, tablets, laptops, and beyond. Mastering them means your websites won’t just look good—they’ll feel natural on any device.