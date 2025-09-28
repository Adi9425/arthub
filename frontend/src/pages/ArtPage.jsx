"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/UI/button";
import { Input } from "../components/UI/input";
import { Card, CardContent } from "../components/UI/card";
import { Badge } from "../components/UI/badge";
import { Search, Filter, X, Heart, Eye, ChevronDown } from "lucide-react";

export default function ArtGallery() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const [filters, setFilters] = useState({
    medium: "",
    style: "",
    price_min: "",
    price_max: "",
    search: "",
  });

  // pending filters (changed by user but applied only on button click)
  const [pendingFilters, setPendingFilters] = useState({
    medium: "",
    style: "",
    price_min: "",
    price_max: "",
    search: "",
  });

  // ✅ Fetch artworks from API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/artworks/search");
        if (!res.ok) throw new Error("Failed to fetch artworks");
        const data = await res.json();
        setArtworks(data);
        setFilteredArtworks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // ✅ Unique values for dropdowns
  const uniqueMediums = [...new Set(artworks.map((art) => art.medium))].filter(Boolean);
  const uniqueStyles = [...new Set(artworks.map((art) => art.style))].filter(Boolean);

  // ✅ Apply filters whenever filters state changes
  useEffect(() => {
    let filtered = artworks;

    if (filters.search) {
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          art.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
          art.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.medium) {
      filtered = filtered.filter((art) => art.medium === filters.medium);
    }

    if (filters.style) {
      filtered = filtered.filter((art) => art.style === filters.style);
    }

    if (filters.price_min) {
      filtered = filtered.filter((art) => art.price >= Number(filters.price_min));
    }

    if (filters.price_max) {
      filtered = filtered.filter((art) => art.price <= Number(filters.price_max));
    }

    setFilteredArtworks(filtered);
  }, [filters, artworks]);

  // pending filter change
  const handlePendingFilterChange = (key, value) => {
    setPendingFilters((prev) => ({ ...prev, [key]: value }));
  };

  // apply pending filters
  const applyFilters = () => {
    setFilters(pendingFilters);
  };

  // clear filters
  const clearFilters = () => {
    setFilters({
      medium: "",
      style: "",
      price_min: "",
      price_max: "",
      search: "",
    });
    setPendingFilters({
      medium: "",
      style: "",
      price_min: "",
      price_max: "",
      search: "",
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading artworks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-background via-secondary/20 to-primary/5">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl md:text-7xl font-serif mb-6">
            Curated Art Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover extraordinary artworks from talented artists worldwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search artworks, artists..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            {Object.values(filters).some((v) => v) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Medium</label>
                <select
                  value={pendingFilters.medium}
                  onChange={(e) => handlePendingFilterChange("medium", e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Mediums</option>
                  {uniqueMediums.map((medium) => (
                    <option key={medium} value={medium}>
                      {medium}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Style</label>
                <select
                  value={pendingFilters.style}
                  onChange={(e) => handlePendingFilterChange("style", e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Styles</option>
                  {uniqueStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Min Price</label>
                <Input
                  type="number"
                  placeholder="$0"
                  value={pendingFilters.price_min}
                  onChange={(e) => handlePendingFilterChange("price_min", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Max Price</label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={pendingFilters.price_max}
                  onChange={(e) => handlePendingFilterChange("price_max", e.target.value)}
                />
              </div>
            </CardContent>

            {/* Apply / Clear Buttons */}
            <div className="flex justify-end gap-3 px-6 pb-6">
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" /> Clear
              </Button>
              <Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Filter className="h-4 w-4 mr-2" /> Apply Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Results */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif mb-2">No artworks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtworks.map((artwork) => (
              <Card
                key={artwork._id}
                className="group overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="w-full h-64 object-cover"
                  />

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      ${artwork.price?.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-2">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {artwork.artist}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {artwork.description}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">{artwork.medium}</Badge>
                    <Badge variant="outline">{artwork.style}</Badge>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button
                      size="sm"
                      onClick={() => toggleFavorite(artwork._id)}
                      className={`${
                        favorites.has(artwork._id)
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.has(artwork._id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button size="sm" className="bg-gray-200 text-black">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
