import styled from 'styled-components'
import BasicLayout from "../layout/Basic";

export const Title = styled.h1`
    color:red`
  ;

export default function Home() {
  return (
    <BasicLayout>
      <main>
        <Title>Hello Next World!</Title>
      </main>
    </BasicLayout>
  )
}
