import React from 'react'
import { Header } from '../../components/header/header'
import {Footer} from '../../components/footer/footer'
import { Hero } from '../../components/hero/hero'
import { tennisHomeImageUrl } from "../../constants";
import { Layout } from '../../components/layout/layout';

export const LandingPage = () => {
  return (
    <>
    <Layout/>
    <div
      className={
        'relative mx-auto my-0 flex min-h-screen max-w-screen flex-col overflow-hidden bg-white shadow-2xl'
       }
       style={{
        backgroundImage: `url(${tennisHomeImageUrl})`,
        backgroundSize: "cover"
       }}
    >
      <Header title='Book tennis'/>
      <Hero
        title="A place to enjoy tennis"
        content="Here you can browse tennis courts in different cities, book a court, create your own tennis club."
      />
      <Footer />
    </div>
    </>
  )
}