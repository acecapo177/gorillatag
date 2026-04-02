export default async (req) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/gorilla-tag-token",
      {
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Unable to fetch token data" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return Response.json({
      price: data.market_data?.current_price?.usd ?? null,
      marketCap: data.market_data?.market_cap?.usd ?? null,
      priceChange24h:
        data.market_data?.price_change_percentage_24h ?? null,
    });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch token data" },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/token-price",
};
