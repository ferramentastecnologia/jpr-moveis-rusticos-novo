/**
 * Email Service - SendGrid Integration
 * Envia emails transacionais para:
 * - Confirmação de conta
 * - Confirmação de pedido
 * - Status de pagamento
 * - Atualizações de pedido
 */

const sgMail = require('@sendgrid/mail');

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'contato@jprmoveis.com.br';

/**
 * Enviar email de boas-vindas (após registro)
 * @param {Object} usuario - Dados do usuário
 */
async function enviarBoasVindas(usuario) {
    try {
        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bem-vindo à JPR Móveis</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #dbc1a2; padding: 30px; text-align: center; }
                    .header h1 { color: #6b4436; margin: 0; }
                    .content { padding: 30px; background: #f5f5f5; }
                    .button { display: inline-block; background: #1b8768; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { background: #6b4436; color: white; padding: 20px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🪵 JPR Móveis Rústicos</h1>
                    </div>

                    <div class="content">
                        <h2>Bem-vindo, ${usuario.nome}!</h2>

                        <p>Sua conta foi criada com sucesso em <strong>JPR Móveis Rústicos</strong>.</p>

                        <p>Agora você pode:</p>
                        <ul>
                            <li>✅ Explorar nosso catálogo de móveis rústicos premium</li>
                            <li>✅ Acompanhar seus pedidos em tempo real</li>
                            <li>✅ Receber ofertas exclusivas</li>
                            <li>✅ Compartilhar avaliações de produtos</li>
                        </ul>

                        <p style="text-align: center;">
                            <a href="https://jprmoveis.com.br" class="button">Ir para Loja</a>
                        </p>

                        <p><strong>Dados da Conta:</strong></p>
                        <p>
                            Email: ${usuario.email}<br>
                            Nome: ${usuario.nome}
                        </p>

                        <p style="color: #666; font-size: 12px;">
                            Se você não criou essa conta, ignore este email.
                        </p>
                    </div>

                    <div class="footer">
                        <p>© 2024 JPR Móveis Rústicos. Todos os direitos reservados.</p>
                        <p>Blumenau, SC - Brasil | (47) 3288-3096</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: usuario.email,
            from: FROM_EMAIL,
            subject: `Bem-vindo à JPR Móveis, ${usuario.nome}! 🎉`,
            html
        };

        await sgMail.send(msg);
        console.log(`✅ Email de boas-vindas enviado para ${usuario.email}`);

    } catch (error) {
        console.error('Erro ao enviar email de boas-vindas:', error.message);
        throw error;
    }
}

/**
 * Enviar confirmação de pedido
 * @param {Object} pedido - Dados do pedido
 * @param {Object} usuario - Dados do usuário
 * @param {Array} itens - Itens do pedido
 */
async function enviarConfirmacaoPedido(pedido, usuario, itens) {
    try {
        const dataFormatada = new Date(pedido.data_pedido).toLocaleDateString('pt-BR');

        let itensHtml = '';
        let totalItens = 0;
        itens.forEach((item, index) => {
            totalItens += item.subtotal;
            itensHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.produto_nome}</td>
                    <td>${item.quantidade}x</td>
                    <td>R$ ${item.preco_unitario.toFixed(2)}</td>
                    <td>R$ ${item.subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pedido Confirmado</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #dbc1a2; padding: 30px; text-align: center; }
                    .header h1 { color: #6b4436; margin: 0; }
                    .content { padding: 30px; background: #f5f5f5; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    table th { background: #6b4436; color: white; padding: 12px; text-align: left; }
                    table td { padding: 10px; border-bottom: 1px solid #ddd; }
                    table tr:hover { background: #e8e8e8; }
                    .total { font-weight: bold; font-size: 16px; }
                    .button { display: inline-block; background: #1b8768; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { background: #6b4436; color: white; padding: 20px; text-align: center; font-size: 12px; }
                    .status-badge { display: inline-block; background: #ffc107; color: #333; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🪵 JPR Móveis Rústicos</h1>
                    </div>

                    <div class="content">
                        <h2>Pedido Confirmado! ✅</h2>

                        <p>Olá <strong>${usuario.nome}</strong>,</p>

                        <p>Seu pedido foi confirmado com sucesso! Abaixo estão os detalhes:</p>

                        <p>
                            <strong>Número do Pedido:</strong> <span style="font-family: monospace; background: #ddd; padding: 5px 10px; border-radius: 3px;">${pedido.numero_pedido}</span><br>
                            <strong>Data:</strong> ${dataFormatada}<br>
                            <strong>Status:</strong> <span class="status-badge">Confirmado</span>
                        </p>

                        <h3>Itens do Pedido:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Produto</th>
                                    <th>Qtd</th>
                                    <th>Preço Unit.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itensHtml}
                            </tbody>
                        </table>

                        <h3>Resumo Financeiro:</h3>
                        <p>
                            <strong>Subtotal:</strong> R$ ${totalItens.toFixed(2)}<br>
                            ${pedido.valor_desconto > 0 ? `<strong>Desconto (${pedido.desconto_percentual}%):</strong> -R$ ${pedido.valor_desconto.toFixed(2)}<br>` : ''}
                            <strong class="total">Total: R$ ${pedido.total.toFixed(2)}</strong>
                        </p>

                        <h3>Próximos Passos:</h3>
                        <ol>
                            <li>Aguarde a confirmação de pagamento</li>
                            <li>Seu móvel será preparado para envio</li>
                            <li>Você receberá código de rastreamento</li>
                            <li>Entrega em 10-25 dias úteis</li>
                        </ol>

                        <p style="text-align: center;">
                            <a href="https://jprmoveis.com.br/rastreamento.html" class="button">Rastrear Pedido</a>
                        </p>

                        <p style="color: #666; font-size: 12px;">
                            Dúvidas? Contate-nos: contato@jprmoveis.com.br ou (47) 99716-8814
                        </p>
                    </div>

                    <div class="footer">
                        <p>© 2024 JPR Móveis Rústicos. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: usuario.email,
            from: FROM_EMAIL,
            subject: `Pedido Confirmado - ${pedido.numero_pedido} 📦`,
            html
        };

        await sgMail.send(msg);
        console.log(`✅ Email de confirmação enviado para ${usuario.email}`);

    } catch (error) {
        console.error('Erro ao enviar confirmação de pedido:', error.message);
        throw error;
    }
}

/**
 * Enviar atualização de status do pedido
 * @param {Object} pedido - Dados do pedido
 * @param {Object} usuario - Dados do usuário
 */
async function enviarAtualizacaoPedido(pedido, usuario) {
    try {
        const statusMensagens = {
            'confirmado': '✅ Seu pedido foi confirmado',
            'preparacao': '🔨 Seu móvel está sendo preparado',
            'enviado': '📦 Sua encomenda foi despachada',
            'entregue': '🎉 Seu pedido foi entregue'
        };

        const statusEmoji = {
            'confirmado': '✅',
            'preparacao': '🔨',
            'enviado': '📦',
            'entregue': '🎉'
        };

        const mensagem = statusMensagens[pedido.status] || 'Seu pedido foi atualizado';

        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atualização de Pedido</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #dbc1a2; padding: 30px; text-align: center; }
                    .header h1 { color: #6b4436; margin: 0; }
                    .content { padding: 30px; background: #f5f5f5; }
                    .status-box { background: white; padding: 20px; border-left: 5px solid #1b8768; margin: 20px 0; }
                    .status-title { font-size: 24px; color: #1b8768; font-weight: bold; }
                    .button { display: inline-block; background: #1b8768; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { background: #6b4436; color: white; padding: 20px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🪵 JPR Móveis Rústicos</h1>
                    </div>

                    <div class="content">
                        <h2>Atualização do Seu Pedido</h2>

                        <p>Olá <strong>${usuario.nome}</strong>,</p>

                        <div class="status-box">
                            <div class="status-title">${statusEmoji[pedido.status]} ${mensagem}</div>
                            <p><strong>Número do Pedido:</strong> ${pedido.numero_pedido}</p>
                            ${pedido.rastreamento_codigo ? `
                                <p><strong>Código de Rastreamento:</strong>
                                    <span style="font-family: monospace; background: #ddd; padding: 5px 10px; border-radius: 3px;">
                                        ${pedido.rastreamento_codigo}
                                    </span>
                                </p>
                            ` : ''}
                        </div>

                        ${pedido.status === 'enviado' ? `
                            <p>Seu pedido está a caminho! Você pode acompanhar a entrega usando o código de rastreamento acima.</p>
                        ` : ''}

                        ${pedido.status === 'entregue' ? `
                            <p>Sua encomenda foi entregue com sucesso! Obrigado por escolher JPR Móveis Rústicos.</p>
                            <p><strong>Gostou da sua compra?</strong> Deixe uma avaliação e ajude outros clientes! ⭐</p>
                        ` : ''}

                        <p style="text-align: center;">
                            <a href="https://jprmoveis.com.br/rastreamento.html" class="button">Ver Detalhes</a>
                        </p>

                        <p style="color: #666; font-size: 12px;">
                            Dúvidas? Contate-nos: contato@jprmoveis.com.br
                        </p>
                    </div>

                    <div class="footer">
                        <p>© 2024 JPR Móveis Rústicos. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: usuario.email,
            from: FROM_EMAIL,
            subject: `${statusEmoji[pedido.status]} ${mensagem} - ${pedido.numero_pedido}`,
            html
        };

        await sgMail.send(msg);
        console.log(`✅ Email de atualização enviado para ${usuario.email}`);

    } catch (error) {
        console.error('Erro ao enviar atualização de pedido:', error.message);
        throw error;
    }
}

/**
 * Enviar confirmação de pagamento
 * @param {Object} pagamento - Dados do pagamento
 * @param {Object} usuario - Dados do usuário
 * @param {Object} pedido - Dados do pedido
 */
async function enviarConfirmacaoPagamento(pagamento, usuario, pedido) {
    try {
        const metodoNomes = {
            'pix': '💰 PIX',
            'credit_card': '💳 Cartão de Crédito',
            'boleto': '📄 Boleto Bancário'
        };

        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pagamento Confirmado</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #dbc1a2; padding: 30px; text-align: center; }
                    .header h1 { color: #6b4436; margin: 0; }
                    .content { padding: 30px; background: #f5f5f5; }
                    .success-box { background: #d4edda; border: 2px solid #28a745; padding: 20px; border-radius: 5px; margin: 20px 0; }
                    .success-box h3 { color: #28a745; margin-top: 0; }
                    .info-table { width: 100%; background: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
                    .info-row:last-child { border-bottom: none; }
                    .button { display: inline-block; background: #1b8768; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { background: #6b4436; color: white; padding: 20px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🪵 JPR Móveis Rústicos</h1>
                    </div>

                    <div class="content">
                        <h2>Pagamento Confirmado! ✅</h2>

                        <p>Olá <strong>${usuario.nome}</strong>,</p>

                        <div class="success-box">
                            <h3>✅ Seu pagamento foi recebido com sucesso!</h3>
                            <p>Agora iremos preparar seu pedido para envio.</p>
                        </div>

                        <div class="info-table">
                            <div class="info-row">
                                <strong>Pedido:</strong>
                                <span>${pedido.numero_pedido}</span>
                            </div>
                            <div class="info-row">
                                <strong>Método:</strong>
                                <span>${metodoNomes[pagamento.metodo.toLowerCase()] || pagamento.metodo}</span>
                            </div>
                            <div class="info-row">
                                <strong>Valor:</strong>
                                <span>R$ ${pagamento.valor.toFixed(2)}</span>
                            </div>
                            <div class="info-row">
                                <strong>Data:</strong>
                                <span>${new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>

                        <h3>O que acontece agora?</h3>
                        <ol>
                            <li>Seu pedido está sendo preparado 🔨</li>
                            <li>Receberá código de rastreamento 📦</li>
                            <li>Entrega em 10-25 dias úteis ⏰</li>
                        </ol>

                        <p style="text-align: center;">
                            <a href="https://jprmoveis.com.br/rastreamento.html" class="button">Rastrear Pedido</a>
                        </p>
                    </div>

                    <div class="footer">
                        <p>© 2024 JPR Móveis Rústicos. Todos os direitos reservados.</p>
                        <p>Blumenau, SC - Brasil | (47) 3288-3096</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: usuario.email,
            from: FROM_EMAIL,
            subject: `Pagamento Confirmado - ${pedido.numero_pedido} ✅`,
            html
        };

        await sgMail.send(msg);
        console.log(`✅ Email de confirmação de pagamento enviado para ${usuario.email}`);

    } catch (error) {
        console.error('Erro ao enviar confirmação de pagamento:', error.message);
        throw error;
    }
}

/**
 * Enviar email de contato/suporte
 * @param {string} email - Email do remetente
 * @param {string} nome - Nome do remetente
 * @param {string} mensagem - Mensagem
 */
async function enviarContatoSuport(email, nome, mensagem) {
    try {
        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #dbc1a2; padding: 20px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Nova Mensagem de Contato</h2>
                    </div>

                    <p><strong>De:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${mensagem.replace(/\n/g, '<br>')}</p>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: FROM_EMAIL,
            from: FROM_EMAIL,
            replyTo: email,
            subject: `Novo Contato - ${nome}`,
            html
        };

        await sgMail.send(msg);
        console.log(`✅ Email de contato recebido de ${email}`);

    } catch (error) {
        console.error('Erro ao enviar email de contato:', error.message);
        throw error;
    }
}

module.exports = {
    enviarBoasVindas,
    enviarConfirmacaoPedido,
    enviarAtualizacaoPedido,
    enviarConfirmacaoPagamento,
    enviarContatoSuport
};
