import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import { ContactForm } from './ContactForm';


export function ContactPage() {
  return (
    <>
      <Header />
      <ContactForm />
      <PreFooter />
      <Footer />
    </>
  );
}
