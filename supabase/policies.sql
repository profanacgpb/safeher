ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessoes_sos ENABLE ROW LEVEL SECURITY;
ALTER TABLE localizacoes_sos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conteudos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuárias podem ver seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuárias podem inserir seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuárias podem atualizar seu próprio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuárias podem ver seus contatos" ON contatos;
DROP POLICY IF EXISTS "Usuárias podem inserir seus contatos" ON contatos;
DROP POLICY IF EXISTS "Usuárias podem atualizar seus contatos" ON contatos;
DROP POLICY IF EXISTS "Usuárias podem excluir seus contatos" ON contatos;
DROP POLICY IF EXISTS "Usuárias podem ver suas sessões" ON sessoes_sos;
DROP POLICY IF EXISTS "Usuárias podem inserir suas sessões" ON sessoes_sos;
DROP POLICY IF EXISTS "Usuárias podem atualizar suas sessões" ON sessoes_sos;
DROP POLICY IF EXISTS "Usuárias podem ver localizações de suas sessões" ON localizacoes_sos;
DROP POLICY IF EXISTS "Usuárias podem inserir localizações de suas sessões" ON localizacoes_sos;
DROP POLICY IF EXISTS "Conteúdos públicos" ON conteudos;

CREATE POLICY "Usuárias podem ver seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuárias podem inserir seu próprio perfil" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuárias podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuárias podem ver seus contatos" ON contatos
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem inserir seus contatos" ON contatos
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem atualizar seus contatos" ON contatos
  FOR UPDATE USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem excluir seus contatos" ON contatos
  FOR DELETE USING (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem ver suas sessões" ON sessoes_sos
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem inserir suas sessões" ON sessoes_sos
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem atualizar suas sessões" ON sessoes_sos
  FOR UPDATE USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuárias podem ver localizações de suas sessões" ON localizacoes_sos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM sessoes_sos s
      WHERE s.id = sessao_sos_id AND s.usuario_id = auth.uid()
    )
  );

CREATE POLICY "Usuárias podem inserir localizações de suas sessões" ON localizacoes_sos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessoes_sos s
      WHERE s.id = sessao_sos_id AND s.usuario_id = auth.uid()
    )
  );

CREATE POLICY "Conteúdos públicos" ON conteudos
  FOR SELECT USING (ativo = true);
