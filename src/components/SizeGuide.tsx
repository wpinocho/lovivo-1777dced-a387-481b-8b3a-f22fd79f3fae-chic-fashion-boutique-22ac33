import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Size Guide</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* US Sizes */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">US Sizes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Size</th>
                    <th className="py-2 px-4 text-left">Bust (in)</th>
                    <th className="py-2 px-4 text-left">Waist (in)</th>
                    <th className="py-2 px-4 text-left">Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">XS</td>
                    <td className="py-2 px-4">31-32</td>
                    <td className="py-2 px-4">24-25</td>
                    <td className="py-2 px-4">34-35</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">S</td>
                    <td className="py-2 px-4">33-34</td>
                    <td className="py-2 px-4">26-27</td>
                    <td className="py-2 px-4">36-37</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">M</td>
                    <td className="py-2 px-4">35-36</td>
                    <td className="py-2 px-4">28-29</td>
                    <td className="py-2 px-4">38-39</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">L</td>
                    <td className="py-2 px-4">37-39</td>
                    <td className="py-2 px-4">30-32</td>
                    <td className="py-2 px-4">40-42</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">XL</td>
                    <td className="py-2 px-4">40-42</td>
                    <td className="py-2 px-4">33-35</td>
                    <td className="py-2 px-4">43-45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Guide */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Fit Guide</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Regular Fit:</strong> Follows the body's silhouette with ease for comfortable movement.</p>
              <p><strong>Oversized Fit:</strong> Designed with extra room for a relaxed, effortless look.</p>
              <p><strong>Tailored Fit:</strong> Close-fitting design that follows natural body lines for a polished appearance.</p>
            </div>
          </div>

          {/* Care Instructions */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Care Instructions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Dry clean recommended for tailored pieces</li>
              <li>Hand wash cold for delicate fabrics</li>
              <li>Store on hangers to maintain shape</li>
              <li>Iron on low heat when needed</li>
            </ul>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};