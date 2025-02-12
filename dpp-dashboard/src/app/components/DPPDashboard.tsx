"use client";

import React, { useState, useEffect } from 'react';
import { Scan, Box, Recycle, Info, Clock, Shield, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DPPDashboard = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setActiveProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleScanProduct = async () => {
    setShowScanner(true);
    const id = "PRD789012";
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setActiveProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }finally {
      setShowScanner(false);
    }
  };

  useEffect(() => {
    // Fetch initial product on component mount
    fetchProduct('PRD123456');
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!activeProduct) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Digital Product Passport</h1>
        <button
          onClick={handleScanProduct}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Scan className="w-5 h-5" />
          Scan New Product
        </button>
      </div>

      {showScanner && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTitle>Scanner Active</AlertTitle>
          <AlertDescription>
            Position the QR code within the scanner frame...
          </AlertDescription>
        </Alert>
      )}

      {/* Product Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            {activeProduct.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Product ID</p>
              <p className="font-medium">{activeProduct.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Manufacturer</p>
              <p className="font-medium">{activeProduct.manufacturer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sustainability Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Recycle className="w-5 h-5 text-green-500" />
              Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-500">
                {activeProduct.carbonFootprint}
              </p>
              <p className="text-sm text-gray-500">Carbon Footprint</p>
            </div>
          </CardContent>
        </Card>

        {/* Materials Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeProduct.materials.map((material, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{material.name}</span>
                  <span className="font-medium">{material.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Repair Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Repairability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-purple-500">
                {activeProduct.repairScore}/10
              </p>
              <p className="text-sm text-gray-500">Repair Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supply Chain Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Product Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Current Location</p>
                <p className="text-sm text-gray-500">{activeProduct.location.current}</p>
              </div>
            </div>
            <div className="border-l-2 border-gray-200 ml-2 pl-4 space-y-4">
              {activeProduct.location.history.map((location, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-gray-300" />
                  <p className="text-sm text-gray-500">{location}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recycling Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5" />
            End-of-Life Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{activeProduct.recyclingInstructions}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DPPDashboard;