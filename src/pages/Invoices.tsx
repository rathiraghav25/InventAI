import React, { useEffect, useState } from "react";
import { Download, CheckCircle, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    getInvoices,
    updateInvoice,
    deleteInvoice,
    type Invoice,
} from "../api/invoice";

import { getOrders } from "../api/order";
import { getCustomers } from "../api/customer";
import { getProducts } from "../api/product";

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
      try {
          setLoading(true);

          const [
              invoiceData,
              orderData,
              customerData,
              productData,
          ] = await Promise.all([
              getInvoices(),
              getOrders(),
              getCustomers(),
              getProducts(),
          ]);

          setInvoices(invoiceData);
          setOrders(orderData);
          setCustomers(customerData);
          setProducts(productData);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      loadData();
  }, []);

  const markInvoicePaid = async (id: string) => {
      try {
          await updateInvoice(id, {
              payment_status: "Paid",
          });

          loadData();
      } catch (err) {
          console.error(err);
      }
  };

  const removeInvoice = async (id: string) => {
      try {
          await deleteInvoice(id);

          loadData();
      } catch (err) {
          console.error(err);
      }
  };

  const formatINR = (amt: number) => `₹${amt.toLocaleString('en-IN')}`;

  const downloadPDF = (invoiceId: string) => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return;
    const order = orders.find(o => o.id === invoice.order_id);
    if (!order) return;
    const customer = customers.find(c => c.id === order.customer_id);

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 28, 63); // Navy primary
    doc.text('INVOICE', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Invoice Number: ${invoice.id}`, 14, 30);
    doc.text(`Date: ${new Date(invoice.invoice_date).toLocaleDateString()}`, 14, 35);
    doc.text(`Status: ${invoice.payment_status}`, 14, 40);

    // Business Info
    doc.setFontSize(14);
    doc.setTextColor(15, 28, 63);
    doc.text('InventAI Business', 130, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('123 Enterprise Heights', 130, 28);
    doc.text('Mumbai, India 400001', 130, 33);
    doc.text('GSTIN: 27AABC1234E1Z2', 130, 38);

    // Billed To
    doc.setFontSize(12);
    doc.setTextColor(15, 28, 63);
    doc.text('Billed To:', 14, 55);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(customer?.name || 'Unknown', 14, 61);
    doc.text(customer?.address || '', 14, 66);
    doc.text(customer?.phone || '', 14, 71);

    // Items Table
    const product = products.find(
        (p) => p.id === order.product_id
    );

    const unitPrice =
        order.quantity > 0
            ? invoice.total_amount / order.quantity
            : 0;

    const tableData = [
        [
            product?.name || "Item",
            order.quantity.toString(),
            `₹${unitPrice.toLocaleString("en-IN")}`,
            `₹${invoice.total_amount.toLocaleString("en-IN")}`,
        ],
    ];

    autoTable(doc, {
      startY: 85,
      head: [['Description', 'Qty', 'Unit Price', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [15, 28, 63] },
      margin: { top: 85 }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(12);
    doc.setTextColor(15, 28, 63);
    doc.text('Total Amount:', 140, finalY);
    doc.setFontSize(14);
    doc.text(`₹${invoice.total_amount.toLocaleString('en-IN')}`, 170, finalY);

    doc.save(`${invoice.id}.pdf`);
  };

  if (loading) {
      return (
          <div
              style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70vh",
                  fontSize: "1.2rem",
              }}
          >
              Loading invoices...
          </div>
      );
  }

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary-dark)' }}>Billing & Invoices</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Manage your invoices, download PDFs, and record payments.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Order Ref</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => {
                const order = orders.find(o => o.id === invoice.order_id);
                const customer = order ? customers.find(c => c.id === order.customer_id) : null;

                return (
                  <tr key={invoice.id}>
                    <td style={{ fontWeight: 600 }}>{invoice.id}</td>
                    <td><span className="badge badge-info">{invoice.order_id}</span></td>
                    <td>{customer?.name || 'Unknown'}</td>
                    <td>{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 600 }}>{formatINR(invoice.total_amount)}</td>
                    <td>
                      <span className={`badge badge-${invoice.payment_status === 'Paid' ? 'success' : 'warning'}`}>
                        {invoice.payment_status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-outline" onClick={() => downloadPDF(invoice.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                          <Download size={14} /> PDF
                        </button>
                        {invoice.payment_status === 'Unpaid' && (
                          <button className="btn btn-ghost" onClick={() => markInvoicePaid(invoice.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--color-success)' }}>
                            <CheckCircle size={14} /> Paid
                          </button>
                        )}
                        <button className="btn btn-ghost" title="Delete Invoice" onClick={() => {if (window.confirm("Delete this invoice?")) {removeInvoice(invoice.id);} }} style={{ padding: '0.25rem', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}> No invoices available yet.
                                                                                    Create an order and an invoice will be generated automatically.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
