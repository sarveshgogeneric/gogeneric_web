import "./RefundPolicy.css";

export default function RefundPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Refund & Return Policy</h1>

        <section>
          <h2>Introduction</h2>
          <p>
            Singhania Med Pvt. Ltd. ("Go Generic") facilitates processing correct
            medicines as per order and prescription and strives to service the
            medicines and products in right conditions without any damage.
            Customers are strongly advised to check the items at the time of
            delivery.
          </p>
        </section>

        <section>
          <h2>Definition</h2>
          <p>
            <strong>Return</strong> means an action of giving back the product
            ordered at Go Generic portal by the consumer. A return may arise in
            the following cases:
          </p>
          <ul>
            <li>Product delivered does not match the order</li>
            <li>Product is expired or near expiry (less than 3 months)</li>
            <li>Product is damaged or seal is tampered</li>
          </ul>
          <p className="note">
            Note: Do not accept delivery if the package is damaged or tampered.
          </p>
        </section>

        <section>
          <h2>Return Conditions</h2>
          <ul>
            <li>Wrongly ordered products are not eligible for return</li>
            <li>Batch number must match the invoice</li>
            <li>Change in prescription does not qualify for return</li>
            <li>Product must be unopened with original packaging and invoice</li>
            <li>Partially consumed products are not returnable</li>
          </ul>
        </section>

        <section>
          <h2>Non-Returnable Products</h2>
          <ul>
            <li>Baby care items (diapers, wipes, bottles, etc.)</li>
            <li>Health drinks & supplements</li>
            <li>Healthcare devices & kits</li>
            <li>Sexual wellness products</li>
            <li>Temperature-controlled & specialty medicines</li>
          </ul>
        </section>

        <section>
          <h2>Return Process</h2>
          <ol>
            <li>Raise a return request via Contact Us page</li>
            <li>Customer care verifies the claim within 72 hours</li>
            <li>Product is collected in original packaging</li>
            <li>Refund processed within 30 days after pickup</li>
          </ol>
        </section>

        <section>
          <h2>Refund Process</h2>
          <ul>
            <li>Online payments refunded to wallet</li>
            <li>COD orders refunded to bank account</li>
          </ul>
        </section>

        <section>
          <h2>Online Consultation</h2>
          <p>
            Refund requests can be raised if consultation responses are not
            provided within the specified timeline. Valid refunds will be
            processed within 30 days.
          </p>
        </section>

        <section>
          <h2>Shipping Charges</h2>
          <p>
            Shipping charges depend on order value and are visible during
            checkout. For more details, contact{" "}
            <strong>info@gogenericpharma.com</strong>.
          </p>
        </section>

        <section>
          <h2>Cancellation Policy</h2>
          <ul>
            <li>Orders can be cancelled before shipment</li>
            <li>Medical tests can be cancelled before sample collection</li>
            <li>Go Generic may cancel orders due to stock or pricing issues</li>
            <li>No cancellation charges apply</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
