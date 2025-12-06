import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Ruler } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { SizeGuide } from '@/components/SizeGuide';
import { CategoryFilter } from '@/components/CategoryFilter';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);

  // Get unique categories from product tags
  const categories = Array.from(
    new Set(
      filteredProducts
        .flatMap(p => p.tags || [])
        .filter(tag => ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knits', 'Accessories'].includes(tag))
    )
  );

  // Filter products by category
  const categoryFilteredProducts = selectedCategory
    ? filteredProducts.filter(p => p.tags?.includes(selectedCategory))
    : filteredProducts;

  const nextCollection = () => {
    setCurrentCollectionIndex((prev) => (prev + 1) % collections.length);
  };

  const prevCollection = () => {
    setCurrentCollectionIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Editorial Style */}
      <section className="relative h-[600px] bg-background overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1777dced-a387-481b-8b3a-f22fd79f3fae/hero-blazer.jpg"
            alt="New Drops"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <p className="text-sm tracking-[0.3em] uppercase text-white mb-4">Spring/Summer 2025</p>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              New Drops
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our latest collection of editorial-inspired pieces designed for the modern woman.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-black" onClick={() => setSizeGuideOpen(true)}>
                <Ruler className="h-4 w-4 mr-2" />
                Size Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trend Carousel - Collections */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Trending Collections</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevCollection}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextCollection}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentCollectionIndex * 100}%)` }}
              >
                {collections.map((collection) => (
                  <div key={collection.id} className="w-full flex-shrink-0">
                    <div 
                      className="relative h-[400px] rounded-none overflow-hidden cursor-pointer group"
                      onClick={() => handleViewCollectionProducts(collection.id)}
                    >
                      {collection.image && (
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-4xl font-bold mb-3">{collection.name}</h3>
                        <p className="text-lg text-white/90 mb-6">{collection.description}</p>
                        <Button variant="outline" className="bg-white text-black hover:bg-white/90">
                          Explore Collection
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="py-8 border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSizeGuideOpen(true)}>
              <Ruler className="h-4 w-4 mr-2" />
              Size Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Shoppable Lookbook - Products Grid */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name 
                  : selectedCategory || 'Shop All'}
              </h2>
              <p className="text-muted-foreground">
                {categoryFilteredProducts.length} {categoryFilteredProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>
            {(selectedCollectionId || selectedCategory) && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  handleShowAllProducts();
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted h-96 animate-pulse" />
              ))}
            </div>
          ) : categoryFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryFilteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No products found in this category.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  handleShowAllProducts();
                  setSelectedCategory(null);
                }}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Modals & Floating Elements */}
      <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <FloatingCart />
    </EcommerceTemplate>
  );
};