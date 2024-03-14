import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";

type ErrorType = {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

export default function FormCreateProduct({ getDataForm }: any) {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("electronic");
  const [image, setImage] = React.useState("placeholderImage");

  const [error, setError] = React.useState<ErrorType>({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // validation
  useEffect(() => {
    if (title.length < 3) {
      setError((prev) => ({
        ...prev,
        title: "Title must be at least 3 characters",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        title: "",
      }));
    }

    if (price <= 0) {
      setError((prev) => ({
        ...prev,
        price: "Price must be greater than 0",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        price: "",
      }));
    }

    if (description.length < 10) {
      setError((prev) => ({
        ...prev,
        description: "Description must be at least 10 characters",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        description: "",
      }));
    }

    if (category === "") {
      setError((prev) => ({
        ...prev,
        category: "Please select a category",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        category: "",
      }));
    }

    if (image === "" || !isValidUrl(image)) {
      setError((prev) => ({
        ...prev,
        image: "Please provide a valid image URL",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        image: "",
      }));
    }
  }, [title, price, description, category, image]);

  useEffect(() => {
    getDataForm({ title, price, description, category, image });
  }, [title, price, description, category, image]);

  // Function to check if a URL is valid
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Product title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Apple Vision Pro"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        {error.title && <span className="text-red-500">{error.title}</span>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          required
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        {error.price && <span className="text-red-500">{error.price}</span>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Product Description" />
        </div>
        <Textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {error.description && (
          <span className="text-red-500">{error.description}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Product Category" />
        </div>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="electronic">Electronic</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </Select>
        {error.category && (
          <span className="text-red-500">{error.category}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Product Image" />
        </div>
        <TextInput
          id="image"
          type="text"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />
        {error.image && <span className="text-red-500">{error.image}</span>}
      </div>
    </form>
  );
}
