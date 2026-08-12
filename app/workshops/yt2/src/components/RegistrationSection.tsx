import { WorkshopRegistrationForm } from '@/components/workshops/WorkshopRegistrationForm';
import { yt2Offer } from '@/lib/offers/offers';

export default function RegistrationSection() {
  return (
    <section className="py-16 px-4 relative" id="register">
      <div className="relative max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-brand-red/20">
        <div className="text-center mb-8">
          <p className="text-brand-red font-bold mb-2">LIVE WORKSHOP REGISTRATION</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Apni seat request bhejein</h2>
          <p className="text-gray-400 mt-3">Support team WhatsApp par details verify karke seat confirm karegi.</p>
        </div>
        <WorkshopRegistrationForm
          offerId={yt2Offer.id}
          offerName={yt2Offer.title}
          workshopDate="Daily, 7:00 PM–9:00 PM PKT"
          variant="dark"
        />
      </div>
    </section>
  );
}
