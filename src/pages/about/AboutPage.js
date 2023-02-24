import React from 'react'
import { useState } from 'react'
import { BackToTop } from '../reusableComponents/BackToTop'
import { Footer } from '../reusableComponents/Footer'
import { Header } from '../reusableComponents/Header'
import { PreFooter } from '../reusableComponents/PreFooter'
import TopScrollProgress from '../reusableComponents/TopScrollProgress'
import { AboutComponent } from './AboutComponent'

export function AboutPage() {
return (
    <>
    <TopScrollProgress />
    <Header />
    <AboutComponent />
    <BackToTop />
    <PreFooter />
    <Footer />
    </>
  )
}

