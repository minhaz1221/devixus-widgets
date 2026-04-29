import React from "react";

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

interface TestimonialsWidgetProps {
  testimonials: Testimonial[];
  title?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FBBF24" : "#E5E7EB"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsWidget({
  testimonials,
  title = "What our customers say",
}: TestimonialsWidgetProps) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      {title && (
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          {title}
        </h2>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {t.rating != null && <StarRating rating={t.rating} />}
            <p
              style={{
                marginTop: "12px",
                color: "#374151",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              {t.content}
            </p>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.author}
                  width={36}
                  height={36}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#3B82F6",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {t.author[0]}
                </div>
              )}
              <div>
                <p style={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>
                  {t.author}
                </p>
                {t.role && (
                  <p style={{ fontSize: "12px", color: "#6B7280" }}>{t.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
