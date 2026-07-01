export const brand = {
  projectId: import.meta.env.VITE_PROJECT_ID || "PROJ-XXXXXXXXX",
  projectName: import.meta.env.VITE_APP_NAME || "Your Resort Name",
  displayName: import.meta.env.VITE_APP_NAME || "Your Resort Name",
  homeDisplayName: import.meta.env.VITE_APP_NAME || "Your Resort Name",
  shortName: "Discovery Samal",
  initials: "DS",
  tagline: "Island Luxury Redefined",
  domain: import.meta.env.VITE_DOMAIN || "yourdomain.com",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000",
  email: "reservations@discoverysamal.com",
  phone: "+63 084 308 2998",
  address: "Island Garden City of Samal, Davao del Norte, 8119, Philippines",
  facebookPageUrl: "https://www.facebook.com/discoverysamal",
  instagramUrl: "https://www.instagram.com/discoverysamal/",
  socialHandle: "@discoverysamal",
  logoUrl: "https://image-tc.galaxy.tf/wipng-7fdiodx62skf1s8iq9jghjsz6/discovery-samal-colour.png?width=500",
  logoWhiteUrl: "https://image-tc.galaxy.tf/wipng-788jbt3890mjhd3ndne0t39dn/discovery-samal-colour-reversal.png?width=500",
  cdnBase: "",
  // Brand palette — luxury Lind-inspired system
  palette: {
    bg:           "#fdfcfa", // warm white page background
    surface:      "#f8f4ef", // card / panel surface
    primary:      "#0d3347", // deep ocean blue (dark text, headers)
    brand:        "#0b7a8a", // luxury teal (CTAs, highlights)
    brandDark:    "#0a5e6c", // teal hover state
    brandDeeper:  "#073844", // footer / very dark teal
    gold:         "#b8943c", // warm antique gold (accent)
    goldLight:    "#d4ae6e", // lighter gold
    champagne:    "#e4c47a", // champagne / highlight
    sand:         "#e8d9c8", // warm sand
    ivory:        "#faf6f0", // ivory
    charcoal:     "#1c1c1e", // near-black text
    deep:         "#0d3347", // deep ocean (overlays, footer)
    // legacy aliases
    accent:       "#0b7a8a",
    accentDark:   "#0a5e6c",
  },
};
