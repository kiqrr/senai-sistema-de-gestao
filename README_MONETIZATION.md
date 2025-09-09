# Sistema de Monetização Simplificado - SENAI

## Visão Geral
Este sistema implementa uma versão simplificada de monetização para o sistema de gestão de eventos SENAI, onde os eventos podem ter preços associados, mas o "pagamento" é apenas um registro simples com confirmação via popup.

## Funcionalidades Implementadas

### ✅ Eventos com Preços
- Campo de preço opcional na criação de eventos
- Display do preço nos cards de eventos
- Diferenciação visual entre eventos pagos e gratuitos

### ✅ Sistema de Cupons Simplificado
- Tabela de cupons para referência futura
- Estrutura preparada para validação de códigos

### ✅ Fluxo de Registro Simplificado
- Botão "Comprar Ingresso" para eventos pagos
- Botão "Registrar-se (Grátis)" para eventos gratuitos
- Popup de confirmação imediata após clique
- Registro direto no banco de dados

## Estrutura do Banco de Dados

### Tabela `events`
- Campo `price` adicionado (DECIMAL 10,2)
- Permite preços de 0.00 (gratuito) ou valores positivos

### Tabela `coupons`
- Estrutura básica para códigos de desconto
- Preparada para futuras implementações

## Componentes Frontend

### EventForm.js
- Campo opcional para definir preço do ingresso
- Validação básica de valores numéricos

### Events.js
- Exibe preço dos eventos quando maior que zero
- Botão dinâmico baseado no preço (Comprar/Registrar)
- Popup de confirmação simples
- Mantém funcionalidade de feedback

## Como Usar

1. **Criar Evento Pago:**
   - Preencher nome, data, local, descrição, capacidade
   - Inserir preço no campo "Preço (R$)"
   - Salvar evento

2. **Registro em Evento:**
   - Usuário clica em "Comprar Ingresso" ou "Registrar-se (Grátis)"
   - Sistema registra automaticamente
   - Popup confirma o registro

3. **Visualização:**
   - Eventos pagos mostram o preço
   - Eventos gratuitos mostram "Registrar-se (Grátis)"

## Migração do Banco

Execute o arquivo `database_migrations.sql` no Supabase para:
- Adicionar campo `price` à tabela `events`
- Criar tabela `coupons` simplificada

## Limitações

- Não há processamento real de pagamentos
- Não há integração com gateways de pagamento
- Sistema de cupons não implementado funcionalmente
- Sem relatórios financeiros ou splits de pagamento

## Próximos Passos (Opcionais)

Para implementar pagamentos reais no futuro:
1. Adicionar SDKs do Stripe/PagSeguro
2. Implementar PaymentForm com processamento real
3. Criar sistema de cupons funcional
4. Adicionar relatórios financeiros
5. Implementar webhooks para confirmação de pagamentos
