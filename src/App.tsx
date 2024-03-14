import { useEffect, useState } from "react";
import "./App.css";

import { Button, Modal } from "flowbite-react";
import CardComponent from "./components/CardComponent";
import FormCreateProduct from "./components/FormCreateProduct";
import LoadingComponent from "./components/LoadingComponent";

type Status = "idle" | "loading" | "success" | "error";
type Product = {
  readonly id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function App() {
  // const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});
  useEffect(() => {
    setStatus("loading");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);
  if (status === "loading") {
    return (
      <div className="h-screen grid place-content-center">
        <h1 className="text-6xl">
          {" "}
          <LoadingComponent />{" "}
        </h1>
      </div>
    );
  }

  function getDataForm(product: any) {
    console.log(product);
  }
  const createProduct = () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Create product successfully");

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex justify-center my-6">
        <Button onClick={() => setOpenModal(true)}>Create Product</Button>
      </div>

      {/* <div className="h-screen grid place-content-center">
        <h1 className="text-center">{count}</h1>
        <Button onClick={() => setCount(count + 1)}>this is test button</Button>
      </div>
      <hr /> */}
      <div className="mx-16 grid grid-flow-row grid-cols-4">
        {products.map((product) => (
          <CardComponent
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
      {/* Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <FormCreateProduct getDataForm={getDataForm} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
