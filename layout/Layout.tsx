import { Fragment, PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
}
