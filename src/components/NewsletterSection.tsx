import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * Editorial-chic newsletter subscription
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-foreground text-background py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-background/10 p-3">
                    <Mail className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">
                  Welcome to MAISON
                </h3>
                <p className="text-background/70">
                  You're now part of our exclusive community.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-background/70">Newsletter</p>
                  <h3 className="text-3xl font-bold">
                    Stay Connected
                  </h3>
                  <p className="text-lg text-background/70">
                    Join our community for exclusive access to new collections and editorial content.
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:bg-background/20"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="sm:w-auto bg-background text-foreground hover:bg-background/90"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-background/70">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};