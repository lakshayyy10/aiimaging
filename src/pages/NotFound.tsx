import { ArrowRight } from 'lucide-react';
import { ButtonLink, Container, Eyebrow } from '../components/ui';

const NotFound = () => (
  <section className="bg-paper py-[var(--section-y)]">
    <Container>
      <div className="max-w-lead">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="t-h1 mt-5">This page could not be found.</h1>
        <p className="t-lead mt-6">
          The page may have moved. Start from the implant identification platform or the
          reference library.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink to="/">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink to="/xray-library" variant="secondary">
            X-ray library
          </ButtonLink>
        </div>
      </div>
    </Container>
  </section>
);

export default NotFound;
