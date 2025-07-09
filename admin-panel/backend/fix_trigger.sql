DROP TRIGGER IF EXISTS product_keys_change ON product_keys;
DROP FUNCTION IF EXISTS refresh_product_total_amount();

CREATE OR REPLACE FUNCTION refresh_product_total_amount()
RETURNS TRIGGER AS \\$
BEGIN
  UPDATE products
  SET total_amount = (
    SELECT COUNT(*) 
    FROM product_keys 
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    AND used = false
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN NULL;
END;
\\$ LANGUAGE plpgsql;

CREATE TRIGGER product_keys_change
AFTER INSERT OR UPDATE OF used OR DELETE
ON product_keys
FOR EACH ROW
EXECUTE FUNCTION refresh_product_total_amount();
