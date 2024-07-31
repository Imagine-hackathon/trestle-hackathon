export default async function handler(req, res) {
  try {
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
