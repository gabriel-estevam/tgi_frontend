//$("#realizarLogin").click(function() {
$("#logar").submit(function(e) {
	e.preventDefault();
	var login = $("#login").val();
	var senha = $("#senha").val();
	var form = new FormData();
	form.append("login", login);
	form.append("senha", senha);

	var settings = {
		"url": "http://localhost/tgi_backend/api/login",
		"method": "POST",
		"timeout": 0,
		"processData": false,
		"mimeType": "multipart/form-data",
		"contentType": false,
		"data": form
	};

	$.ajax(settings).done(function (response) {
		const resJson = JSON.parse(response);
		if(resJson.data[0]['token']){
			window.localStorage.setItem('token', resJson.data[0]['token']);
			window.location.href="menu.html";
		} else {
			var x = document.getElementById("snackbar_error_password");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
		}
	});
});

function recuperarSenha(){
	var login = $("#loginRecuperar").val();
	var form = new FormData();
	form.append("login", login);

	var settings = {
		"url": "http://localhost/tgi_backend/api/reset",
		"method": "POST",
		"timeout": 0,
		"processData": false,
		"mimeType": "multipart/form-data",
		"contentType": false,
		"data": form
	};

	$.ajax(settings).done(function (response) {
		const resJson = JSON.parse(response);
		$('#modalResetPassword').modal('hide');
		if(resJson.data[0]['success']){
			var x = document.getElementById("snackbar_reset_perfect");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
		} else {
			var x = document.getElementById("snackbar_reset_fail");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
		}
	});
};

function exitSystem(){
	localStorage.removeItem('token');
	window.location.href="index.html";
}

function homeSystem(){
	window.location.href="menu.html";
}

function userInfo() {
	var token = localStorage.getItem('token')
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	valueJson = JSON.parse(jsonPayload);
	return valueJson
}

function callMenu(){
	var token = localStorage.getItem('token')
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	valueJson = JSON.parse(jsonPayload);
	html  = '<a href="#" class="brand-link" style="text-align: center;">';
	html += '<span class="brand-text font-weight-light">CONTROLE DE ESTOQUE</span>';
	html += '</a>';
	html += '<div class="sidebar">';
	html += '<center>';
	html += '<div class="user-panel" style="margin-top: 5px;">';
	html += '<div class="info">';
	html += '<a href="#" class="d-block">Olá, ' + valueJson['nome'] + '</a>';
	html += '</div>';
	html += '</div>';
	html += '</center>';
	html += '<nav class="mt-2">';
	html += '<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">';
	if(valueJson['nivel_acesso'] == 0){
		html += '<li class="nav-item">';
		html += '<a href="pages/ListaEstoqueFilial.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-cubes"></i>';
		html += '<p>';
		html += 'Consultar Movimentação de Estoque';
		html += '<li class="nav-item">';
		html += '<a href="pages/recebimento.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-truck"></i>';
		html += '<p>';
		html += 'Recebimento';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/RetiradaProduto.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-minus"></i>';
		html += '<p>';
		html += 'Retirada de Produtos';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/SolicitacaoMaterialFilial.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-comments"></i>';
		html += '<p>';
		html += 'Solicitação de Produtos';
		html += '</p>';
		html += '</a>';
		html += '</li>';
	}
	if(valueJson['nivel_acesso'] == 1){
		html += '<li class="nav-item">';
		html += '<a href="pages/SolicitacaoMaterial.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-comments"></i>';
		html += '<p>';
		html += 'Produtos Solicitados pelas Filiais';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/MovimentacaoEstoque.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-cube"></i>';
		html += '<p>';
		html += 'Movimentação de Estoque';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/EstoqueFilial.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-cubes"></i>';
		html += '<p>';
		html += 'Estoque Filiais';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/EstoqueAlmoxarifado.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-warehouse"></i>';
		html += '<p>';
		html += 'Estoque Almoxarifado';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/compras.html" class="nav-link">';
		html += '<i class="nav-icon fa fa-cart-plus"></i>';
		html += '<p>';
		html += 'Compras';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="#" class="nav-link">';
		html += '<i class="nav-icon fa fa-list-alt"></i>';
		html += '<p>';
		html += 'Cadastros';
		html += '<i class="right fas fa-angle-left"></i>';
		html += '</p>';
		html += '</a>';
		html += '<ul class="nav nav-treeview">';
		html += '<li class="nav-item">';
		html += '<a href="pages/usuarios.html" class="nav-link">';
		html += '<i class="fas fa-users nav-icon"></i>';
		html += '<p>Usuários</p>';
		html += '</a>';
		html += '</li>';

		html += '<li class="nav-item">';
		html += '<a href="pages/representante.html" class="nav-link">';
		html += '<i class="fas fa-user nav-icon"></i>';
		html += '<p>Representante</p>';
		html += '</a>';
		html += '</li>';

		html += '<li class="nav-item">';
		html += '<a href="pages/fornecedor.html" class="nav-link">';
		html += '<i class="fas fa-handshake nav-icon"></i>';
		html += '<p>Fornecedores</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/unidades.html" class="nav-link">';
		html += '<i class="fas fa-building nav-icon"></i>';
		html += '<p>Filiais</p>';
		html += '</a>';
		html += '</li>';
		html += '<li class="nav-item">';
		html += '<a href="pages/produtos.html" class="nav-link">';
		html += '<i class="fas fa-tags nav-icon"></i>';
		html += '<p>';
		html += 'Produtos';
		html += '</p>';
		html += '</a>';
		html += '</li>';
		html += '</ul>';
		html += '</li>';
	}
	html += '</nav>';
	html += '</div>';
	document.getElementById('menu').innerHTML = html;
}

function launch_toast() {
	html = '<div id="toast"><div id="img"><i class="fa fa-check-square-o" aria-hidden="true"></i></div><div id="desc">Operação realizada com sucesso!</div></div>';
	document.getElementById('call_toast').innerHTML = html;
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}