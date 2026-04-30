import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const PRICE_PER_METER = 30

export function CalculatorSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [length, setLength] = useState("")

  const meters = parseFloat(length) || 0
  const total = meters * PRICE_PER_METER

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setLength(val)
    }
  }

  const presets = [10, 25, 50, 100]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Калькулятор
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Расчёт стоимости кабеля</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <label className="mb-2 block font-mono text-xs text-foreground/60">Длина кабеля (метры)</label>
            <input
              type="text"
              inputMode="decimal"
              value={length}
              onChange={handleInput}
              placeholder="Введите длину..."
              className="w-full border-b border-foreground/30 bg-transparent pb-3 text-4xl font-light text-foreground placeholder:text-foreground/20 focus:border-foreground/60 focus:outline-none md:text-5xl"
            />

            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <p className="mb-2 w-full font-mono text-xs text-foreground/50">Быстрый выбор:</p>
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setLength(String(p))}
                  className={`border px-4 py-2 font-mono text-sm transition-all duration-200 hover:bg-foreground/10 ${
                    meters === p
                      ? "border-foreground/60 text-foreground"
                      : "border-foreground/20 text-foreground/60"
                  }`}
                >
                  {p} м
                </button>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="mb-6 border-l border-foreground/30 pl-6 md:pl-8">
              <p className="mb-1 font-mono text-xs text-foreground/50">Цена за метр</p>
              <p className="font-sans text-2xl font-light text-foreground/70 md:text-3xl">
                {PRICE_PER_METER} ₽/м
              </p>
            </div>

            <div className="mb-6 border-l border-foreground/30 pl-6 md:pl-8">
              <p className="mb-1 font-mono text-xs text-foreground/50">Длина</p>
              <p className="font-sans text-2xl font-light text-foreground/70 md:text-3xl">
                {meters > 0 ? `${meters} м` : "—"}
              </p>
            </div>

            <div className="border-l-2 border-foreground/60 pl-6 md:pl-8">
              <p className="mb-1 font-mono text-xs text-foreground/60">Итого</p>
              <p
                className={`font-sans text-5xl font-light tracking-tight text-foreground transition-all duration-300 md:text-6xl lg:text-7xl ${
                  meters > 0 ? "opacity-100" : "opacity-30"
                }`}
              >
                {meters > 0 ? `${total.toLocaleString("ru-RU")} ₽` : "0 ₽"}
              </p>
            </div>

            <div
              className={`mt-10 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => scrollToSection?.(5)}
              >
                Оставить заявку
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
