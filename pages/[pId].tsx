import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";

type Product = {
  id: string;
  title: string;
  description: string;
};

type LoadedProduct = {
  loadedProduct: Product;
};

const DetailsPage = (props: LoadedProduct) => {
  const { loadedProduct } = props;
  return (
    <div>
      <div>Title: {loadedProduct.title}</div>
      <div>Description: {loadedProduct.description}</div>
    </div>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const productId = params?.pId;
  const data = await getData();
  const product = data.products.find(
    (product: Product) => product.id === productId
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await getData();

  const ids = data.mpa((product: Product) => product.id);
  const pathWithParams = ids.map((id: string) => ({
    params: {
      pId: id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
};

export default DetailsPage;
