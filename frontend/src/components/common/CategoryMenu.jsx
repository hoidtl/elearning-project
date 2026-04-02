import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (subcategories[categoryId]) return;

    try {
      console.log('Fetching subcategories for category:', categoryId);
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      console.log('Subcategories response:', data);
      setSubcategories(prev => ({
        ...prev,
        [categoryId]: data.data || []
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
    fetchSubcategories(categoryId);
  };

  const handleMouseLeave = () => {
    // Delay để cho phép di chuột xuống submenu
    setTimeout(() => {
      if (!isSubmenuHovered) {
        setHoveredCategory(null);
      }
    }, 100);
  };

  const handleSubmenuMouseEnter = () => {
    setIsSubmenuHovered(true);
  };

  const handleSubmenuMouseLeave = () => {
    setIsSubmenuHovered(false);
    setHoveredCategory(null);
  };

  return (
    <>
      {/* Menu chính - trắng */}
      <div className="category-menu">
        <div className="container">
          <div className="category-menu-items">
            {categories.slice(0, 8).map((category) => (
              <div
                key={category._id}
                className="category-menu-item"
                onMouseEnter={() => handleMouseEnter(category._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/products?category=${category._id}`}>
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submenu đen - hiện khi hover */}
      {hoveredCategory && subcategories[hoveredCategory] && subcategories[hoveredCategory].length > 0 && (
        <div 
          className="category-submenu"
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <div className="container">
            <div className="category-submenu-items">
              {subcategories[hoveredCategory].map((sub, index) => (
                <Link
                  key={index}
                  to={`/products?category=${hoveredCategory}&subcategory=${sub}`}
                  className="category-submenu-item"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryMenu;
