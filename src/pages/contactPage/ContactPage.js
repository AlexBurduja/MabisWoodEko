import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import TopScrollProgress from '../reusableComponents/TopScrollProgress';
import { ContactForm } from './ContactForm';


export function ContactPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
      <ContactForm />
      <PreFooter />
      <Footer />
    </>
  );
}
