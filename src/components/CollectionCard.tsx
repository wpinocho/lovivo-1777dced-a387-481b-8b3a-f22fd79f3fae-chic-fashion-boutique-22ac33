import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="overflow-hidden border-0 group cursor-pointer" onClick={() => onViewProducts(collection.id)}>
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl line-clamp-1">
              {collection.name}
            </h3>
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-foreground group-hover:text-background transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onViewProducts(collection.id);
            }}
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}